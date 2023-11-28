import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { saveAs } from 'file-saver';
import copyicon from '../assets/copy.svg';
import downloadicon from '../assets/download.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Tree = () => {
    const [testcase, setTestcase] = useState(1);
    const [size, setSize] = useState(1);
    const [output, setOutput] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'testcase':
                setTestcase(value);
                break;
            case 'size':
                setSize(value);
                break;
            default:
                break;
        }
    };

    const TreeEdges = (prufer, m) => {
        let vertices = m + 2;
        let vertex_set = new Array(vertices);

        for (let i = 0; i < vertices; i++) vertex_set[i] = 0;

        for (let i = 0; i < vertices - 2; i++) vertex_set[prufer[i] - 1] += 1;

        let j = 0;
        let edges = [];
        for (let i = 0; i < vertices - 2; i++) {
            for (j = 0; j < vertices; j++) {
                if (vertex_set[j] == 0) {
                    vertex_set[j] = -1;
                    let edge = [];
                    edge.push(j + 1);
                    edge.push(prufer[i]);
                    edges.push(edge.join(' '));
                    vertex_set[prufer[i] - 1]--;
                    break;
                }
            }
        }

        j = 0;
        let edge = [];
        for (let i = 0; i < vertices; i++) {
            if (vertex_set[i] == 0 && j == 0) {
                edge.push(i + 1);
                j++;
            } else if (vertex_set[i] == 0 && j == 1) {
                edge.push(i + 1);
            }
        }
        edges.push(edge.join(' '));

        return edges.join('\n');
    };

    const generateRandomTree = (n) => {
        let length = n - 2;
        let arr = new Array(length);

        for (let i = 0; i < length; i++) {
            arr[i] = Math.floor(Math.random() * (length + 1)) + 1;
        }
        return TreeEdges(arr, length);
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
            generatedOutput.push(size);
            if(size != 1) generatedOutput.push(generateRandomTree(size));
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
                            <label htmlFor='size' className='form-label fw-semibold'>
                                Size of Tree
                            </label>
                            <input type='number' className='form-control' id='size' name='size' value={size} onChange={handleInputChange} />
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

export default Tree;
