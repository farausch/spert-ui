import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Graph from 'react-graph-vis';

const prediction_service_url = "https://spert-api-mtvfo2xgia-ey.a.run.app/fs-predict?"
const hierarchy_service_url = "http://localhost:5000/hierarchy?"

async function predictSentence(sentence) {
    console.log("Calling prediction service...")
    const res = await fetch(prediction_service_url + new URLSearchParams({
        text: sentence }))
    const json = await res.json()
    console.log(json)
    return json
}

async function extractXbrlHierarchy(nodes) {
    console.log("Calling hierarchy service...")
    const res = await fetch(hierarchy_service_url,{
            body: JSON.stringify(nodes),
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST"
        })
    const json = await res.json()
    console.log(json)
    return json
}

export default function Prediction() {

    const [hasMounted, setHasMounted] = useState(false);
    const [inputText, setInputText] = useState("");
    const [graph, setGraph] = useState({ nodes: [], edges: [], rand: "" });

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    const options = {
        autoResize: true,
        layout: {
          hierarchical: true
        },
        edges: {
          color: "#000000"
        },
        height: "600px"
    };

    async function handleClickPredict() {
        const predictionRes = await predictSentence(inputText);
        const id = 0
        const nodes = []
        const edges = []
        const mapping = {}
        for (let s = 0; s < predictionRes.length; s++) {
            for (let e = 0; e < predictionRes[s]["entities"].length; e++) {
                const start = predictionRes[s]["entities"][e]["start"]
                const end = predictionRes[s]["entities"][e]["end"]
                mapping[s, e] = id
                nodes.push({ id: id, color: "rgba(43, 99, 178)", font: {color: "rgba(255, 255, 255)"}, label: predictionRes[s]["tokens"].slice(start, end).join(" ") })
                id += 1
            }
            for (let r = 0; r < predictionRes[s]["relations"].length; r++) {
                const head = mapping[s, predictionRes[s]["relations"][r]["head"]]
                const tail = mapping[s, predictionRes[s]["relations"][r]["tail"]]
                edges.push({ from: head, to: tail, label: predictionRes[s]["relations"][r]["type"] })
            }
        }
        const hierarchyRes = await extractXbrlHierarchy(nodes);
        for (const newEdge of hierarchyRes) {
            edges.push(newEdge)
        }
        setGraph({
            nodes: nodes,
            edges: edges,
            rand: Math.random()
        });
    }

    return (
        <>
			<Container>
                <Form>
                    <Form.Group className="mb-3" controlId="financial-statements-text-input">
                        <Form.Control onChange={event => setInputText(event.target.value)} as="textarea" rows={5} placeholder="Text from financial statement" />
                    </Form.Group>
                </Form>
                <div className="d-grid gap-2">
                    <Button className="btn-secondary" size='sm' onClick={handleClickPredict}>Extract financial statement graph</Button>
                </div>
			</Container>
            <Container>
                <Graph
                    key={graph.rand}
                    graph={graph}
                    options={options}
                />
            </Container>
		</>
    )

}
