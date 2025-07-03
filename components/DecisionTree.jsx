import React, { useState } from "react";

export default function DecisionTree() {
  const [step, setStep] = useState(1);

  if (step === 1) {
    return (
      <div style={{margin: '1.5em 0', padding: '1em', border: '1px solid #eee', borderRadius: '8px', background: '#fafbfc'}}>
        <strong>Step 1: Is your contract a proxy?</strong>
        <p>
          <a href="https://etherscan.io/proxyContractChecker" target="_blank" rel="noopener noreferrer">Check using Etherscan Proxy Checker</a>
        </p>
        <button onClick={() => setStep('proxy')} style={{marginRight: '1em'}}>Yes</button>
        <button onClick={() => setStep(2)}>No</button>
      </div>
    );
  }
  if (step === 'proxy') {
    return (
      <div style={{margin: '1.5em 0', padding: '1em', border: '1px solid #eee', borderRadius: '8px', background: '#f0fff0'}}>
        <strong>Proxy Contract Detected</strong>
        <ul>
          <li>Use implementation ABI at proxy address</li>
          <li>Submit the proxy address</li>
          <li>Use the implementation contract's ABI (not the proxy's ABI)</li>
          <li>The implementation contains the actual business logic</li>
        </ul>
        <button onClick={() => setStep(1)}>Start Over</button>
      </div>
    );
  }
  if (step === 2) {
    return (
      <div style={{margin: '1.5em 0', padding: '1em', border: '1px solid #eee', borderRadius: '8px', background: '#fafbfc'}}>
        <strong>Step 2: Is it created by a factory?</strong>
        <p>
          <a href="https://docs.dune.com/web-app/decoding/decoding-contracts" target="_blank" rel="noopener noreferrer">Check Dune documentation</a> for details
        </p>
        <button onClick={() => setStep('factory')}>Yes</button>
        <button onClick={() => setStep(3)} style={{marginLeft: '1em'}}>No</button>
      </div>
    );
  }
  if (step === 'factory') {
    return (
      <div style={{margin: '1.5em 0', padding: '1em', border: '1px solid #eee', borderRadius: '8px', background: '#f0f8ff'}}>
        <strong>Factory-Created Contract</strong>
        <ul>
          <li>Enable "Decode other contracts created by the same factory" flags</li>
          <li>Submit the ABI for the <b>created contracts</b>, NOT the factory ABI</li>
          <li>Mark as factory-deployed in submission</li>
          <li>Include sample addresses of created contracts</li>
        </ul>
        <button onClick={() => setStep(1)}>Start Over</button>
      </div>
    );
  }
  if (step === 3) {
    return (
      <div style={{margin: '1.5em 0', padding: '1em', border: '1px solid #eee', borderRadius: '8px', background: '#fafbfc'}}>
        <strong>Step 3: Do all instances share identical bytecode?</strong>
        <p>
          <a href="https://etherscan.io/find-similar-contracts" target="_blank" rel="noopener noreferrer">Verify using Etherscan Similar Contracts</a>
        </p>
        <button onClick={() => setStep('bytecode')}>Yes</button>
        <button onClick={() => setStep('standard')} style={{marginLeft: '1em'}}>No</button>
      </div>
    );
  }
  if (step === 'bytecode') {
    return (
      <div style={{margin: '1.5em 0', padding: '1em', border: '1px solid #eee', borderRadius: '8px', background: '#f0f8ff'}}>
        <strong>Identical Bytecode Pattern</strong>
        <ul>
          <li>Enable bytecode matching</li>
          <li>Submit one ABI that covers all instances</li>
          <li>Check the "Enable bytecode matching" checkbox</li>
          <li>Note the shared bytecode pattern</li>
        </ul>
        <button onClick={() => setStep(1)}>Start Over</button>
      </div>
    );
  }
  if (step === 'standard') {
    return (
      <div style={{margin: '1.5em 0', padding: '1em', border: '1px solid #eee', borderRadius: '8px', background: '#fff8f0'}}>
        <strong>Standard Contract Submission</strong>
        <ul>
          <li>Submit the contract's ABI with the specific contract address and chain</li>
          <li>Straightforward process with no special considerations</li>
          <li><b>Note: This is the most common scenario</b></li>
        </ul>
        <em>If you are unsure, always default to Standard Submission</em>
        <br />
        <button onClick={() => setStep(1)} style={{marginTop: '1em'}}>Start Over</button>
      </div>
    );
  }
  return null;
} 