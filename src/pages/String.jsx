import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { saveAs } from 'file-saver';
import copyicon from '../assets/copy.svg';
import downloadicon from '../assets/download.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const String = () => {
    const [testcase, setTestcase] = useState(1);
    const [size, setSize] = useState(1);
    const [output, setOutput] = useState('');
    const [includeLower, setIncludeLower] = useState(true);
    const [includeUpper, setIncludeUpper] = useState(false);
    const [includeNumber, setIncludeNumber] = useState(false);

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

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;

        switch (name) {
            case 'includeLower':
                setIncludeLower(checked);
                break;
            case 'includeUpper':
                setIncludeUpper(checked);
                break;
            case 'includeNumber':
                setIncludeNumber(checked);
                break;
            default:
                break;
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (testcase < 0 || size < 0 || (!includeLower && !includeUpper && !includeNumber)) {
            toast.error('Invalid input values. Please check your input.');
            return;
        }

        if (testcase * size > 100000) {
            toast.info('Testcase * size should be below 100000.');
            return;
        }

        const generateRandomString = () => {
            const chars = {
                lower: 'abcdefghijklmnopqrstuvwxyz',
                upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
                number: '0123456789',
            };

            let allowedChars = '';

            if (includeLower) {
                allowedChars += chars.lower;
            }

            if (includeUpper) {
                allowedChars += chars.upper;
            }

            if (includeNumber) {
                allowedChars += chars.number;
            }

            let randomString = '';
            for (let i = 0; i < size; i++) {
                const randomChar = allowedChars[Math.floor(Math.random() * allowedChars.length)];
                randomString += randomChar;
            }

            return randomString;
        };

        const generatedOutput = [testcase];
        for (let i = 0; i < testcase; i++) {
            generatedOutput.push(size);
            generatedOutput.push(generateRandomString());
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
                                Size of String
                            </label>
                            <input type='number' className='form-control' id='size' name='size' value={size} onChange={handleInputChange} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='type' className='form-label fw-semibold'>
                                Include
                            </label>
                            <div class='form-check'>
                                <input class='form-check-input' type='checkbox' id='lower' name='includeLower' checked={includeLower} onChange={handleCheckboxChange} />
                                <label class='form-check-label' htmlFor='type'>
                                    a-z
                                </label>
                            </div>
                            <div class='form-check'>
                                <input class='form-check-input' type='checkbox' id='upper' name='includeUpper' checked={includeUpper} onChange={handleCheckboxChange} />
                                <label class='form-check-label' htmlFor='type'>
                                    A-Z
                                </label>
                            </div>
                            <div class='form-check'>
                                <input class='form-check-input' type='checkbox' id='number' name='includeNumber' checked={includeNumber} onChange={handleCheckboxChange} />
                                <label class='form-check-label' htmlFor='type'>
                                    0-9
                                </label>
                            </div>
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
                    <textarea className='form-control' style={{ height: '300px' }} id='exampleFormControlTextarea1' value={output} readOnly />
                    <ToastContainer autoClose={2000} hideProgressBar={true} closeOnClick />
                </div>
            </div>
        </>
    );
};

export default String;
