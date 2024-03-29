/* =============================================================================
                            handle_submit()
============================================================================= */


//convert_value is a helper function called within handle_submit
function convert_value(textarea_value, radio_value){
  switch (radio_value) {
  //There's no need for break; if one returns immediately.
  case 'binary': return converter.text_string_to_binary_string(textarea_value);
  case 'text':   return converter.binary_string_to_text_string(textarea_value);
  }
}


function handle_submit(e){
  e.preventDefault();

  //////////////////////////////////////////////////////////////////////////////
  //
  //  HTMLFormElement.elements
  //
  //  https://www.w3schools.com/jsref/coll_form_elements.asp
  //  https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/elements
  //
  //  string is the value of the name attribute (i.e., name="string")
  //
  //  console.log(e.target.elements.string.value);
  //  console.log(e.target.elements.string.tagName);
  //  console.log(e.target.elements.string.nodeName);
  //
  //////////////////////////////////////////////////////////////////////////////
  const textarea_value = e.target.elements.string.value.trim();
  const radio_value    = e.target.elements.text_or_binary_radio.value.trim();
  //A NodeList that can later be used to uncheck all radios.
  const radios         = e.target.elements.text_or_binary_radio;

  if (textarea_value === '' || radio_value ===''){
    alert("Please fill out the form completely.");
    return; //return early.
  }


  const result           = convert_value(textarea_value, radio_value);
  const result_div       = document.getElementById("result-div");
  result_div.textContent = result;


  //Clear the value form fields
  //e.target.elements.string.value        = '';
  //radios.forEach(radio => radio.checked = false);

  //It's easier just to reset the form.
  e.target.reset();
}


/* =============================================================================
                              pow()
============================================================================= */


function pow(){
  const pow_img = document.getElementById("pow-img");
  pow_img.classList.add("zoom-in");
  setTimeout(() => { pow_img.classList.remove("zoom-in"); }, 500);
}


/* =============================================================================
                          Intialize Variables
============================================================================= */


//Create new Converter instance
//Note: the use of the convert_value function depends
//on us naming our new Converter as converter.
const converter = new Converter;



/* =============================================================================
                               window.onload
============================================================================= */



window.onload = () => {
  /* ==============================
      Add event listeners
  ============================== */
  //This was done here mainly just to encapsulate them.


  //Submit event listener
  const text_binary_conversion_form = document.getElementById("text-binary-conversion-form");
  text_binary_conversion_form.addEventListener('submit', (e) => { handle_submit(e) });


  //Clear event listener
  const clear_button = document.getElementById("clear-button");
  clear_button.addEventListener('click', () => {
    const result_div       = document.getElementById("result-div");
    result_div.textContent = '';
  });


  //Function Machine event listener
  const function_machine_img = document.getElementById("function-machine-img");
  function_machine_img.addEventListener('click', pow);


  /* ==============================
         Add in transitions
  ============================== */


  setTimeout(() => {
    const pow_img                  = document.getElementById("pow-img");
    pow_img.style.transition       = "transform 0.15s linear";

    const submit_button            = text_binary_conversion_form.querySelector("input[type=submit]");
    submit_button.style.transition = "all 0.15s linear";

    clear_button.style.transition  = "all 0.15s linear";
  }, 500);


  /* ==============================
    Fire a Pow! (because why not?)
  ============================== */


  setTimeout(pow, 1500);
}
