#!/bin/bash

COINBASE='https://w3id.org/cc#coinbase'

credit create -d $1
credit genesis -d $1 -w $2

credit insert $COINBASE 100000 '' $3 seed -d $1 -w $2
