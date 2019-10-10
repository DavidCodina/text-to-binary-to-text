class Converter {
  // constructor(){
  // 	console.log("A new instance of class Converter has been created.")
  // }

  /* ===========================================================================
                   Convert text string to binary string
  =========================================================================== */


  text_string_to_unicode_array(text_string){
    let unicode_array = [];
    for (let i = 0; i < text_string.length; i++){
      unicode_array.push(text_string.charCodeAt(i));
    }
  return unicode_array;
  }


  unicode_array_to_binary_array(unicode_array){
    let binary_array = [];
    for (let i = 0; i < unicode_array.length; i++){
      const unicode_element = unicode_array[i];
      const binary_element  = unicode_element.toString(2);
      binary_array.push(binary_element);
    }
    return binary_array;
  }


  binary_array_to_binary_string(binary_array){
    //Initialize as empty string so that the return value does not begin with undefined.
    let binary_string = "";
    binary_array.forEach((element) => {
      binary_string += element + " ";
    });
    return binary_string.trim();
  }


  text_string_to_binary_string(text_string){
    const unicode_array = this.text_string_to_unicode_array(text_string);
    const binary_array  = this.unicode_array_to_binary_array(unicode_array);
    const binary_string = this.binary_array_to_binary_string(binary_array);
    return binary_string;
  }


  /* ===========================================================================
                    Convert binary string to text string
  =========================================================================== */


  binary_string_to_binary_array(binary_string){
    const binary_array = binary_string.split(" ");
    return binary_array;
  }


  binary_array_to_unicode_array(binary_array){
    let unicode_array = [];

    for (let i = 0; i < binary_array.length; i++){
      const binary_element   = binary_array[i];


      //A simple check to ensure that no element in binary_array contains
      //characters other than 0 and 1.
      for (let i = 0; i < binary_element.length; i++){
        let binary_element_character = binary_element[i];

        //////////////////////////////////////////////////////////////////////////
        //
        //  If the binary_element_character is neither 0 nor 1, then
        //  both conditions will evaluate to false.
        //  Thus if (! (false || false)) return false;
        //  The return value of false is subsequently used by unicode_array_to_text_string()
        //  to terminate the conversion process.
        //
        //////////////////////////////////////////////////////////////////////////

        if (!(binary_element_character == '1' || binary_element_character == '0')){
          return false;
        }
      }

      const unicode_element  = parseInt(binary_element, 2); //Pass 2 as radix arg.
      unicode_array.push(unicode_element);
    }

    return unicode_array;
  }


  unicode_array_to_text_string(unicode_array){
    if (!unicode_array){
      alert(`Please use only 0s and 1s when converting binary to text. \r\rA value of false was passed to unicode_array_to_text_string() because a character other than 0 or 1 was found in at least one part of the string. \r\rThe conversion process has been terminated.`);
      return;
    }


    let string = '';
    for (let i = 0; i < unicode_array.length; i++){
      let unicode_element  = unicode_array[i];
      let string_character = String.fromCharCode(unicode_element);

      //////////////////////////////////////////////////////////////////////////
      //
      //  This is an added check.
      //  It will fire if the use sumbits a character other than a number.
      //  However, that validity check is also covered in binary_array_to_unicode_array,
      //  whereby it ensures that the user only submitted 0s and 1s.
      //
      //  However, it is still possible to pass an invalid value using just 0s and 1s.
      //  For example, submitting 10000000000000000000000000 will create a unicode element of 33554432.
      //  When 33554432 is passed to String.fromCharCode() it returns: "\u0000" (a value of null).
      //
      //  If you pass String.fromCharCode a single value that does not produce a character,
      //  typeof value will still be string, and value.length will be 1.
      //  Moreover, console.log(value) will come up empty.
      //  However, console.dir(value) will show that the value is in fact null: "\u0000"
      //  If you pass String.fromCharCode() several values at once, the result will simply return
      //  the valid values as if the invalid value never existed.
      //
      //  Conversely, if you submit 10000000000000000000000000001 it will create a unicode element of 268435457.
      //  When 268435457 is passed to String.fromCharCode() it returns: "\u0001"
      //  This character is a Control and is commonly used, that is, in no specific script.
      //  The character is also known as START OF HEADING.
      //  This character seems to have no visible representation.
      //  See here fore more info: http://www.endmemo.com/unicode/ascii.php
      //
      //	Thus it is still possible that the user can get a blank output.
      //	That said, they have to be trying pretty hard to break the experience.
      //
      //////////////////////////////////////////////////////////////////////////


      if (string_character === "\u0000") {
alert(
`There appears to be an invalid character or binary value in your form submission.\r\r
It occurred when attempting to convert the binary value to a unicode value at index: ${i}.\r\r
The value has been converted to '\\u0000' (NULL) and ignored.`
);
      }
      string += string_character;
    }
    return string;
  }

  binary_string_to_text_string(binary_string){
    const binary_array  = this.binary_string_to_binary_array(binary_string);
    const unicode_array = this.binary_array_to_unicode_array(binary_array);
    const text_string   = this.unicode_array_to_text_string(unicode_array);
    return text_string;
  }
} //End of Class Converter
