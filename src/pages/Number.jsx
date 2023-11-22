import React from 'react';
import copyicon from '../assets/copy.svg';
import downloadicon from '../assets/download.svg';

// TODO:
// change default placeholder by selection different type

const Number = () => {
    return (
        <>
            <div className='container d-flex flex-column flex-md-row my-5'>
                <div className='w-100 w-md-50 d-inline-block m-2 shadow bg-body-tertiary p-3 rounded'>
                    <form>
                        <div className='mb-3'>
                            <label htmlFor='testcase' className='form-label fw-semibold'>
                                Testcase
                            </label>
                            <input type='number' className='form-control' id='testcase' aria-describedby='emailHelp' placeholder='1' />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='interger' className='form-label fw-semibold'>
                                Type
                            </label>
                            <div className='form-check'>
                                <input className='form-check-input' type='radio' name='flexRadioDefault' id='interger' defaultChecked />
                                <label className='form-check-label' htmlFor='interger'>
                                    Interger
                                </label>
                            </div>
                            <div className='form-check'>
                                <input className='form-check-input' type='radio' name='flexRadioDefault' id='float' />
                                <label className='form-check-label' htmlFor='float'>
                                    Float
                                </label>
                            </div>
                            <div className='form-check'>
                                <input className='form-check-input' type='radio' name='flexRadioDefault' id='double' />
                                <label className='form-check-label' htmlFor='double'>
                                    Double
                                </label>
                            </div>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='minval' className='form-label fw-semibold'>
                                Min Value
                            </label>
                            <input type='number' className='form-control' id='minval' aria-describedby='emailHelp' placeholder='Enter the minimum value for generation' />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='maxval' className='form-label fw-semibold'>
                                Max Value
                            </label>
                            <input type='number' className='form-control' id='maxval' aria-describedby='emailHelp' placeholder='Enter the maximum value for generation' />
                        </div>
                        <button type='submit' className='btn btn-primary mx-2'>
                            Submit
                        </button>
                        <button type='submit' className='btn btn-danger mx-2'>
                            Reset
                        </button>
                    </form>
                </div>
                <div className='w-100 w-md-50 d-inline-block m-2 shadow bg-body-tertiary p-3 rounded'>
                    <div className='d-flex justify-content-between mb-2'>
                        <div className='fw-semibold'>Output</div>
                        <div>
                            <img src={copyicon} className='mx-1' style={{ height: '20px' }} alt='Copy' />
                            <img src={downloadicon} className='mx-2' style={{ height: '20px' }} alt='Download' />
                        </div>
                    </div>
                    <textarea className='form-control' style={{ height: '386px' }} id='exampleFormControlTextarea1'></textarea>
                </div>
            </div>
        </>
    );
};

export default Number;
