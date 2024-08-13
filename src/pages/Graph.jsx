import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { saveAs } from 'file-saver';
import copyicon from '../assets/copy.svg';
import downloadicon from '../assets/download.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Graph = () => {
    const [testcase, setTestcase] = useState(1);
    const [node, setNode] = useState(1);
    const [edge, setEdge] = useState(1);
    const [output, setOutput] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'testcase':
                setTestcase(value);
                break;
            case 'node':
                setNode(value);
                break;
            case 'edge':
                setEdge(value);
                break;
            default:
                break;
        }
    };

    const generateRandomGraph = (n) => {
        const st = new Set();
        
        function randomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
        let m = Math.min(edge,node * (node - 1)/2);
        while (m > 0) {
            let u = randomInt(1, n);
            let v = randomInt(1, n);
            if (u > v) [u, v] = [v, u];  // Swap u and v if u is greater than v
            if (u === v || st.has(`${u},${v}`)) continue;
            st.add(`${u},${v}`);
            m--;
        }
        
        return Array.from(st)
        .map(pair => pair.split(',').map(Number).join(' '))
        .join('\n');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (testcase < 0) {
            toast.error('Invalid input values. Please check your input.');
            return;
        }
        if (testcase > 100000) {
            toast.info(`Testcase should be below 100000!`);
            return;
        }

        const generatedOutput = [testcase];

        for (let index = 0; index < testcase; index++) {
            generatedOutput.push(node);
            generatedOutput.push(edge);
            generatedOutput.push(generateRandomGraph(node));
        }

        setOutput(generatedOutput.join('\n'));
    };

    const handleClear = (event) => {
        event.preventDefault();
        const generatedOutput = '';
        setOutput(generatedOutput);
    };

    const handleCopyClick = () => {
        toast.success('Content copied to clipboard!');
    };

    const handleDownloadClick = () => {
        const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, 'output.txt');
    };

    return (
        <>
            <div className='container d-flex flex-column flex-md-row my-5'>
                <div className='w-100 w-md-50 d-inline-block my-2 shadow bg-body-tertiary p-3 rounded mx-auto mx-md-2'>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor='testcase' className='form-label fw-semibold'>
                                Testcase
                            </label>
                            <input type='number' className='form-control' id='testcase' name='testcase' value={testcase} onChange={handleInputChange} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='node' className='form-label fw-semibold'>
                                node of Graph
                            </label>
                            <input type='number' className='form-control' id='node' name='node' value={node} onChange={handleInputChange} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='edge' className='form-label fw-semibold'>
                                Number of Edges
                            </label>
                            <input type='number' className='form-control' id='edge' name='edge' value={edge} onChange={handleInputChange} />
                        </div>
                        <button type='submit' className='btn btn-primary mx-2'>
                            Generate
                        </button>
                        <button type='clear' className='btn btn-danger mx-2' onClick={handleClear}>
                            Clear
                        </button>
                    </form>
                </div>
                <div className='w-100 w-md-50 d-inline-block my-2 shadow bg-body-tertiary p-3 rounded mx-auto mx-md-2'>
                    <div className='d-flex justify-content-between mb-2'>
                        <div className='fw-semibold'>Output</div>
                        <div>
                            <CopyToClipboard text={output} onCopy={handleCopyClick}>
                                <img src={copyicon} className='mx-1' style={{ height: '20px', cursor: 'pointer' }} alt='Copy' />
                            </CopyToClipboard>
                            <img src={downloadicon} className='mx-2' style={{ height: '20px', cursor: 'pointer' }} alt='Download' onClick={handleDownloadClick} />
                        </div>
                    </div>
                    <textarea className='form-control' style={{ height: '360px' }} id='exampleFormControlTextarea1' value={output} readOnly />
                    <ToastContainer autoClose={2000} hideProgressBar={true} closeOnClick />
                </div>
            </div>
        </>
    );
};

export default Graph;
