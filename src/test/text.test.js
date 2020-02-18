/* This is a text unit test file for testing Test.js inside Util folder */

// import * as FnScript from './../utils/Test';

/* Text testing script */

// const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
// /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

const isWord = text => {
	/* 
		Word in this test is described as any parameter that is a string type,
		and has more than 1 alphabet in it. 
	*/
	return typeof text === 'string' && text.length > 1;
}

// export const isEmail = email => {
// 	return emailRegex.test(email);
// }

const isSentence = s => {
	/*
		Sentence in this test is described as any parameter that is a string type, 
		and contains several words in it, which are separated by a space in between
		each word. 
	*/

	return typeof s === 'string' && Boolean(s.split(' ').length > 1);
}

/* Testing isWord */
test('Determination is a word', () => {
  expect(isWord('Determination')).toBe(true);
});

/* Testing isEmail */
// test('name.surname@email.com is a valid email', () => {
//   expect(isEmail('name.surname@mail.com')).toBe(true);
// });

/* Testing isSentence */
test('I love to eat is a proper sentence', () => {
  expect(isSentence('I love to eat')).toBe(true);
});

/* Purposely make this fail */
test('Boo is a proper sentence', () => {
  expect(isSentence('Boo')).toBe(true);
});
