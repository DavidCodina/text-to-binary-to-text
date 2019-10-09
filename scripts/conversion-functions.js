/* =============================================================================
                      Convert text string to binary string
============================================================================= */


function text_string_to_unicode_array(text_string){
	let unicode_array = [];
	for (let i = 0; i < text_string.length; i++){
		unicode_array.push(text_string.charCodeAt(i));
	}
	return unicode_array;
}


function unicode_array_to_binary_array(unicode_array){
	let binary_array = [];
	for (let i = 0; i < unicode_array.length; i++){
		const unicode_element = unicode_array[i];
	  const binary_element  = unicode_element.toString(2);
		binary_array.push(binary_element);
	}
	return binary_array;
}


function binary_array_to_binary_string(binary_array){
	//Initialize as empty string so that the return value does not begin with undefined.
	let binary_string = "";
	binary_array.forEach((element) => {
		binary_string += element + " ";
	});
	return binary_string.trim();
}


function text_string_to_binary_string(text_string){
	const unicode_array = text_string_to_unicode_array(text_string);
	const binary_array  = unicode_array_to_binary_array(unicode_array);
	const binary_string = binary_array_to_binary_string(binary_array);
	return binary_string;
}


/* =============================================================================
                      Convert binary string to text string
============================================================================= */


function binary_string_to_binary_array(binary_string){
	const binary_array = binary_string.split(" ");
	return binary_array;
}


function binary_array_to_unicode_array(binary_array){
	let unicode_array = [];
	for (let i = 0; i < binary_array.length; i++){
		const binary_element   = binary_array[i];
	  const unicode_element  = parseInt(binary_element, 2); //Pass 2 as radix arg.
		unicode_array.push(unicode_element);
	}
	return unicode_array;
}


function unicode_array_to_text_string(unicode_array){
	let string = '';
	for (let i = 0; i < unicode_array.length; i++){
		let unicode_element  = unicode_array[i];
		let string_character = String.fromCharCode(unicode_element);
		string += string_character;
	}
	return string;
}

function binary_string_to_text_string(binary_string){
	const binary_array  = binary_string_to_binary_array(binary_string);
	const unicode_array = binary_array_to_unicode_array(binary_array);
	const text_string   = unicode_array_to_text_string(unicode_array);
	return text_string;
}


/* =============================================================================
                                  Test
============================================================================= */


// const text_string   = "Secret message...";
// console.log(text_string);
//
//
// const binary_string = text_string_to_binary_string(text_string);
// console.log(binary_string);
//
//
// const text_string_2 = binary_string_to_text_string(binary_string);
// console.log(text_string_2);
