import React, { useEffect, useState } from 'react';
import './Card.css';

const Card = ({ salt }) => {
  const [selectedForm, setSelectedForm] = useState('');
  const [selectedStrength, setSelectedStrength] = useState('');
  const [selectedPacking, setSelectedPacking] = useState('');
  const [strengthen, setStrengthen] = useState([]);
  const [packings, setPackings] = useState([]);
  const [priceInfo, setPriceInfo] = useState('');
  const [showMoreForms, setShowMoreForms] = useState(4);
  const [showMoreStrengths, setShowMoreStrengths] = useState(4);
  const [showMorePackings, setShowMorePackings] = useState(4)

  useEffect(()=>{
    intializeHandlers();
  },[])

  const intializeHandlers = async () => {
    const forms = salt['available_forms']
    if(forms){
      handleFormSelection(forms[0]);
      //setSelectedForm(forms[0]);
    const strengthen = Object.keys(salt['salt_forms_json'][forms[0]])
    if(strengthen){
       handleStrengthSelection(strengthen[0],forms[0])
      // setSelectedStrength(strengthen[0])
       const packings = Object.keys(salt['salt_forms_json'][forms[0]][strengthen[0]])
      if(packings){
        handlePackingSelection(packings[0],strengthen[0],forms[0],)
      }
    }
    
    
    }
  }

  const forms = salt['available_forms'];

  const handleFormSelection = (form) => {
    setSelectedForm(form);
    setSelectedStrength('');
    setSelectedPacking('');
    setStrengthen(Object.keys(salt['salt_forms_json'][form]));
  };

  const handleStrengthSelection = (strength,form) => {

    setSelectedStrength(strength);
    setPackings(Object.keys(salt['salt_forms_json'][selectedForm?selectedForm:form][strength]));
  };

  const handlePackingSelection = (packing,strengthen, form) => {
    setSelectedPacking(packing);
    const packageEntries = salt['salt_forms_json'][selectedForm?selectedForm:form][selectedStrength?selectedStrength:strengthen][packing];

    if (packageEntries) {
      const validEntries = Object.values(packageEntries).filter(entry => entry !== null);
      if (validEntries.length > 0) {
        const minSellingPrice = validEntries.map(entry => entry.map(shop => shop['selling_price'])).flat();
        setPriceInfo(`From ₹${Math.min(...minSellingPrice)}`);
      } else {
        setPriceInfo("No stores selling this product near you");
      }
    } else {
      setPriceInfo("No stores selling this product near you");
    }
  };
  const handleFormButton = (form) =>{
    try{
    const packageEntries = JSON.stringify(salt['salt_forms_json'][form])
  
   return packageEntries.includes('selling_price') ?  {
     // Apply dashed border style
    // Add other styles as needed
   
  }: {borderStyle: 'dashed'}
}
catch(e){
  console.log(e)
  return {}
}
}
  const handleStrengthenButton = (strengthen) =>{
    try{
    const packageEntries = JSON.stringify(salt['salt_forms_json'][selectedForm][strengthen])
  
   return packageEntries.includes('selling_price') ?  {
     // Apply dashed border style
    // Add other styles as needed
   
  }: {borderStyle: 'dashed'}
}
catch(e){
  console.log(e)
  return {}
}
}

const handlePackageButton = (packing) =>{

  console.log('-->', selectedForm, selectedStrength,packing)
  try{
  const packageEntries = JSON.stringify(salt['salt_forms_json'][selectedForm][selectedStrength][packing])


 return packageEntries.includes('selling_price') ?  {
   // Apply dashed border style
  // Add other styles as needed
}: {borderStyle: 'dashed'}
  }
  catch(e){
    console.log(e)
    return {}
  }


}


  return (
    <div className="card">
 
      <section class="layout">
  <div class="grow1">
    <table>
        <tbody>
        <tr>
            <td>From:</td>
           <td>
           {forms.slice(0,showMoreForms).map((form, index) => (
        <React.Fragment key={index}>
          {index % 2 === 0 && <tr />}
          <td><button
          className={selectedForm === form ? 'active' : 'notactive'}
          style={handleFormButton(form)}
          onClick={() => handleFormSelection(form)}
          >{form}</button>
          {index+1 ===  showMoreForms && forms.length>4 && <span onClick={()=>{setShowMoreForms(prev => prev === 4 ? forms.length : 4)}}>{showMoreForms ===4 ? `More..`:`Hide`}</span>}</td>
        </React.Fragment>
      ))}
           </td>
        </tr>
        <tr>
            <td>strengthen:</td>
            <td>
           {strengthen.slice(0,showMoreStrengths).map((strength, index) => (
        <React.Fragment key={index}>
          {index % 2 === 0 && <tr />}
          <td><button
            className={selectedStrength === strength ? 'active' : 'notactive'}
            style={handleStrengthenButton(strength)}

            onClick={() => handleStrengthSelection(strength)}
            >{strength}</button>
             {index+1 === showMoreStrengths && strengthen.length>4 && <span onClick={()=>{setShowMoreStrengths(prev => prev === 4 ? strength.length : 4)}}>{showMoreStrengths ===4 ? `More..`:`Hide`}</span>}
            </td>
        </React.Fragment>
      ))}
           </td>

        </tr>
        <tr>
            <td>Packing:</td>
            <td>
           {packings.slice(0,showMorePackings).map((packing, index) => (
        <React.Fragment key={index}>
          {index % 2 === 0 && <tr />}
          <td><button
            style={handlePackageButton(packing)}
             className={selectedPacking === packing ? 'active' : 'notactive'}
             onClick={() => handlePackingSelection(packing)}>{packing}</button>
             {index+1 === showMorePackings && packings.length>4 && <span onClick={()=>{setShowMorePackings(prev => prev === 4 ? packings.length : 4)}}>{showMorePackings ===4 ? `More..`:`Hide`}</span>}</td>
        </React.Fragment>
      ))}
           </td>

        </tr>
        </tbody>
    </table>
  </div>
  <div class="grow1">
    <h1>{salt.salt}</h1><br></br>
    <p>{selectedForm }{ selectedStrength && ` | ${selectedStrength} `}{selectedPacking && `| ${ selectedPacking}`}</p>
  </div>
  <div class="grow1">
    <h4>{priceInfo}</h4>
  </div>

</section>
    </div>
  );
};

export default Card;
