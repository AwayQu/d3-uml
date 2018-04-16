import {ClassDiagram, Context} from "./class-diagram";
import {
    _arrowAggregation, _arrowAssociation, _arrowComposition, _arrowDependency, _arrowGeneralization,
    _arrowRealization
} from "./class-diagram-relationship";
import * as dagreD3 from "dagre-d3";
import {d3} from "./d3";


function createLabel(root, classes) {
    ClassDiagram._createClasses(new Context(d3, d3.select(root).append("svg")), classes)
}

function processClassNodeInfo(classInfo) {
    return {
        nodeName: classInfo.classname,
        value: {
            shape: "rect",
            label: [classInfo],
            labelType: "lazySvg",
            labelFn: createLabel,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0
        }
    }
}

const ClassDiagramGraph = dagreD3.graphlib.Graph;

ClassDiagramGraph.prototype.setClassDiagramNode = function (classInfo) {
    const processedClassInfo = processClassNodeInfo(classInfo);
    this.setNode(processedClassInfo.nodeName, processedClassInfo.value)
};


const previousRender = dagreD3.render;

function ClassDiagramRender() {
    const r = new previousRender();
    r.arrows().generalizationPoint = _arrowGeneralization;
    r.arrows().realizationPoint = _arrowRealization;
    r.arrows().associationPoint = _arrowAssociation;
    r.arrows().aggregationPoint = _arrowAggregation;
    r.arrows().compositionPoint = _arrowComposition;
    r.arrows().dependencyPoint = _arrowDependency;

    return r
}



export {
    ClassDiagramGraph,
    ClassDiagramRender
}