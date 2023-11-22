import React, { useState } from 'react';
import copyicon from '../assets/copy.svg';
import downloadicon from '../assets/download.svg';

// TODO:
// Generate Output
// Copy and Download Icon

const Number = () => {
    const [type, setType] = useState('integer');
    const [testcase, setTestcase] = useState(1);
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
        const generatedOutput = `Testcase: ${testcase}, Type: ${type}, Min Value: ${minval}, Max Value: ${maxval}`;
        setOutput(generatedOutput);
    };

    const handleReset = (event) => {
        event.preventDefault();
        const generatedOutput = '';
        setOutput(generatedOutput);
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
                            <input type='number' className='form-control' id='testcase' name='testcase' value={testcase} onChange={handleInputChange} aria-describedby='emailHelp' placeholder='1' />
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
                            <input type='number' className='form-control' id='minval' name='minval' value={minval} onChange={handleInputChange} aria-describedby='emailHelp' placeholder='Enter the minimum value for generation' />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='maxval' className='form-label fw-semibold'>
                                Max Value
                            </label>
                            <input type='number' className='form-control' id='maxval' name='maxval' value={maxval} onChange={handleInputChange} aria-describedby='emailHelp' placeholder='Enter the maximum value for generation' />
                        </div>
                        <button type='submit' className='btn btn-primary mx-2'>
                            Submit
                        </button>
                        <button type='reset' className='btn btn-danger mx-2' onClick={handleReset}>
                            Reset
                        </button>
                    </form>
                </div>
                <div className='w-100 w-md-50 d-inline-block my-2 shadow bg-body-tertiary p-3 rounded mx-auto mx-md-2'>
                    <div className='d-flex justify-content-between mb-2'>
                        <div className='fw-semibold'>Output</div>
                        <div>
                            <img src={copyicon} className='mx-1' style={{ height: '20px' }} alt='Copy' />
                            <img src={downloadicon} className='mx-2' style={{ height: '20px' }} alt='Download' />
                        </div>
                    </div>
                    <textarea className='form-control' style={{ height: '360px' }} id='exampleFormControlTextarea1' value={output} readOnly />
                </div>
            </div>
        </>
    );
};

export default Number;
