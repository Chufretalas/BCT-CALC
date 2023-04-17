import React from 'react'
import HammingCode from './page'
import doTheHamming from '@/helpers/hamming_code/do_the_hamming'
import { binarySeq } from '@/types/binary_seq'

describe('test the doTheHamming function', () => {
  it('spits out the right values for "even" 0110', () => {
    const inputBin: binarySeq = [0, 1, 1, 0]
    const inputParity = "even"

    const result = doTheHamming(inputBin, inputParity)

    const expect = {
      finalData: [1, 1, 0, 0, 1, 1, 0],
      parityCount: 3,
      parityPositions: [1, 2, 4],
      parityResp: [
        [0, 2, 4, 6],
        [1, 2, 5, 6],
        [3, 4, 5, 6]
      ]
    }

    assert.deepEqual(result, expect)
  })
  it('spits out the right values for "odd" 0110', () => {
    const inputBin: binarySeq = [0, 1, 1, 0]
    const inputParity = "odd"

    const result = doTheHamming(inputBin, inputParity)

    const expect = {
      finalData: [0, 0, 0, 1, 1, 1, 0],
      parityCount: 3,
      parityPositions: [1, 2, 4],
      parityResp: [
        [0, 2, 4, 6],
        [1, 2, 5, 6],
        [3, 4, 5, 6]
      ]
    }

    assert.deepEqual(result, expect)
  })

  it('spits out the right values for "even" 10011', () => {
    const inputBin: binarySeq = [1, 0, 0, 1, 1]
    const inputParity = "even"

    const result = doTheHamming(inputBin, inputParity)

    const expect = {
      finalData: [1, 0, 1, 1, 0, 0, 1, 1, 1],
      parityCount: 4,
      parityPositions: [1, 2, 4, 8],
      parityResp: [
        [0, 2, 4, 6, 8, 10, 12, 14],
        [1, 2, 5, 6, 9, 10, 13, 14],
        [3, 4, 5, 6, 11, 12, 13, 14],
        [7, 8, 9, 10, 11, 12, 13, 14]
      ]
    }

    assert.deepEqual(result, expect)
  })
  it('spits out the right values for "odd" 10011', () => {
    const inputBin: binarySeq = [1, 0, 0, 1, 1]
    const inputParity = "odd"

    const result = doTheHamming(inputBin, inputParity)

    const expect = {
      finalData: [0, 1, 1, 0, 0, 0, 1, 0, 1],
      parityCount: 4,
      parityPositions: [1, 2, 4, 8],
      parityResp: [
        [0, 2, 4, 6, 8, 10, 12, 14],
        [1, 2, 5, 6, 9, 10, 13, 14],
        [3, 4, 5, 6, 11, 12, 13, 14],
        [7, 8, 9, 10, 11, 12, 13, 14]
      ]
    }

    assert.deepEqual(result, expect)
  })
})