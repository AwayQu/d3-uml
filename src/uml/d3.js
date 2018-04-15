import * as d3 from "d3";
import * as d3Selection from "d3-selection-multi"

import {
    ClassDiagram
} from './class-diagram'
import multilineText from './multiline-text'

d3.ClassDiagram = ClassDiagram

d3.multilineText = multilineText

export {
    d3
}