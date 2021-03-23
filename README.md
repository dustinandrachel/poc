# Pittack Design

## Description
Personal Site to train the kids and do POC work.
- March 2021 - Key Management is a React app used to manage key/value pairs.

## Installation

Use the package manager yarn to install.
```
yarn
yarn start
```


## Usage

In the input box you can enter one
of the following commands to interact with the data where key = {key} and value = {value}.  Both the key and value are strings:

- `KEYS` lists all of the keys
- `ITEMS` lists all of the key/values
- `CLEAR` delets all of the key/values
- `ALLMEMBERS` lists all of the values across all keys
- `KEYEXISTS {key}` checks existence of the key (ex: foo)
- `VALUEEXISTS {key value}` checks existence of the key/value (ex: foo bar) 
- `MEMBERS {key}` lists the values for a key (ex: foo)
- `ADD {key value}` adds the key/value (ex: foo bar)
- `REMOVEALL {key}` removes the key and its values (ex: foo)
- `REMOVE {key value}` removes the key/value (ex: foo bar)

To see the dataset you can check the 'Show Data' checkbox to the right of the input textbox.


## Visuals

![image](https://user-images.githubusercontent.com/9953268/112156321-24a37b80-8bb4-11eb-8af5-bd66dfd57135.png)

![image](https://user-images.githubusercontent.com/9953268/112156521-50266600-8bb4-11eb-83d2-aeadb5ac542b.png)
