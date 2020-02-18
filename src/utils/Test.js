/* Test functions for testing Jest */

/* Numeric testing script */

export const SumThis = (a, b) => {
  return a + b;
};

export const SubtractThis = (a, b) => {
	return a - b;
}

export const MultiplyThis = (a, b) => {
	return a * b;
}

export const DivideThis = (a, b) => {
	return a / b;
}

/* Text testing script */

const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export const isWord = text => {
	/* 
		Word in this test is described as any parameter that is a string type,
		and has more than 1 alphabet in it. 
	*/
	return typeof text === 'string' && text.length > 1;
}

export const isEmail = email => {
	return emailRegex.test(email);
}

export const isSentence = s => {
	/*
		Sentence in this test is described as any parameter that is a string type, 
		and contains several words in it, which are separated by a space in between
		each word. 
	*/

	return typeof s === 'string' && Boolean(s.split(' ').length > 1);
}



