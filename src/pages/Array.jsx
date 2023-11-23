import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { saveAs } from 'file-saver';
import copyicon from '../assets/copy.svg';
import downloadicon from '../assets/download.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Array = () => {
    const [type, setType] = useState('integer');
    const [testcase, setTestcase] = useState(1);
    const [size, setSize] = useState(1);
    const [minval, setMinval] = useState(-100);
    const [maxval, setMaxval] = useState(100);
    const [output, setOutput] = useState('');

    const handleTypeChange = (event) => {
        const selectedType = event.target.value;
        setType(selectedType);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'testcase':
                setTestcase(value);
                break;
            case 'size':
                setSize(value);
                break;
            case 'minval':
                setMinval(value);
                break;
            case 'maxval':
                setMaxval(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (testcase < 0 || size < 0 || parseInt(minval) > parseInt(maxval)) {
            toast.error('Invalid input values. Please check your input.');
            return;
        }

        if (testcase * size > 100000) {
            toast.info('Testcase * size should be below 100000.');
            return;
        }

        const generatedOutput = [];
        generatedOutput.push(testcase);

        for (let testCaseIndex = 0; testCaseIndex < testcase; testCaseIndex++) {
            // Add the current testcase number

            // Add the size value
            generatedOutput.push(size);

            // Add array values
            const arrayValues = [];
            for (let arrayIndex = 0; arrayIndex < size; arrayIndex++) {
                const randomNumber = type === 'integer' ? Math.floor(Math.random() * (parseInt(maxval) - parseInt(minval) + 1)) + parseInt(minval) : Math.random() * (parseFloat(maxval) - parseFloat(minval)) + parseFloat(minval);
                arrayValues.push(randomNumber);
            }
            generatedOutput.push(arrayValues.join(' '));
        }

        // Set the output
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
                                Size of Array
                            </label>
                            <input type='number' className='form-control' id='size' name='size' value={size} onChange={handleInputChange} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='type' className='form-label fw-semibold'>
                                Type
                            </label>
                            <div className='form-check'>
                                <input className='form-check-input' type='radio' name='flexRadioDefault' id='integer' value='integer' checked={type === 'integer'} onChange={handleTypeChange} />
                                <label className='form-check-label' htmlFor='integer'>
                                    Integer
                                </label>
                            </div>
                            <div className='form-check'>
                                <input className='form-check-input' type='radio' name='flexRadioDefault' id='noninterger' value='noninterger' checked={type === 'noninterger'} onChange={handleTypeChange} />
                                <label className='form-check-label' htmlFor='noninterger'>
                                    Non Integer
                                </label>
                            </div>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='minval' className='form-label fw-semibold'>
                                Min Value
                            </label>
                            <input type='number' className='form-control' id='minval' name='minval' value={minval} onChange={handleInputChange} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='maxval' className='form-label fw-semibold'>
                                Max Value
                            </label>
                            <input type='number' className='form-control' id='maxval' name='maxval' value={maxval} onChange={handleInputChange} />
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
                    <textarea className='form-control' style={{ height: '446px' }} id='exampleFormControlTextarea1' value={output} readOnly />
                    <ToastContainer autoClose={2000} hideProgressBar={true} closeOnClick />
                </div>
            </div>
        </>
    );
};

export default Array;
