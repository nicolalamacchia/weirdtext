# WeirdText
Encoding and decoding tool.

WeirdText is a text encoder/decoder.
Actually, its output is not a real "encryption" because humans could quite easily read it. Machines, instead, may find its output difficult to read without the list of original words.

The purpose of WeirdText is not just having fun. There are real-world applications for it.
E.g.: encryption is forbidden by law in your country, but you still don't want your email content to get automatically processed somehow.

## Encoding
For each word belonging to the original text, it leaves its first and last characters in their original position, but shuffles (permutes) all the characters in the middle of the word.
If possible, the resulting encoded word should not be the same as the original word. Whatever is not a word (whitespace, punctuation, etc.), should be left untouched.
In order to make decoding possible to a machine, the encoder will also output a list of original words (only those that got actually shuffled).
For more details see the example below.

## Decoding
Before decoding text, first do a simple check if the text looks like encoded.
If not, it raises some error to the user.

Then, it uses the encoded text and the words list to decode the text.

The decoded output will be identical (as much as possible) to the original text.
In case of ambiguities (some encoded words could be decoded to two or more original words) it shows a warning.

## Example
### Original text
```
This is a long looong test sentence,
with some big (biiiiig) words!
```

### Encoded text
```
Tihs is a lnog loonog tset sntceene,
wtih smoe big (biiiiig) wdros!
```

### Encoded words list
```
long looong sentence some test This with words
```

### Decoded text
```
This is a long looong test sentence,
with some big (biiiiig) words!
```
