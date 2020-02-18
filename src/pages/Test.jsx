import React, { useState, useEffect } from 'react';

const useTest = testDefault => {
  const [test, setTest] = useState(testDefault);
  // useEffect(() => {
  //   setTest(`parm: ${testDefault} - internal: ${test}`);
  // }, [testDefault]);
  return test;
};

export default function Test() {
  const [test, setTest] = useState('');
  const newTest = useTest(test);
  return (
    <div>
      <p>Test - {test}</p>
      <input
        type="text"
        name="text"
        id="text"
        value={test}
        onChange={e => setTest(e.target.value)}
      />
      <p>Use test - {newTest}</p>
    </div>
  );
}
