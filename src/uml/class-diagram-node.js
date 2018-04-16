function Context(d3, svg) {
    this.svg = svg;
    this.d3 = d3;
}


function Box(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Box.prototype.midX = function () {
    return this.x + this.width / 2;
};
Box.prototype.rightX = function () {
    return this.x + this.width;
}
Box.prototype.midY = function () {
    return this.y + this.height / 2;
}
Box.prototype.bottomY = function () {
    return this.y + this.height;
}

function ClassDiagram(d3, svg) {
    this.d3 = d3;
    this.svg = svg;
    this.ctx = new Context(d3, svg);
}

ClassDiagram.Box = Box;

function _createConnectors(ctx, connectors) {
    const d3 = ctx.d3;
    const svg = ctx.svg;
    const line = d3.line()
        .x(function (d) {
            return d.x;
        })
        .y(function (d) {
            return d.y;
        });

    svg.selectAll('path.connector')
        .data(connectors).enter().append('path')
        .each(function (d, i) {
            var path = d3.select(this);
            path.attrs({
                'class': 'connector',
                'd': line(d.points),
                'stroke': 'black',
                'stroke-width': 1,
                'fill': 'none'
            });
            if (d.markerEnd) {
                path.attrs({'marker-end': 'url(#' + d.markerEnd + ')'});
            }
        });

    svg.selectAll('path.connector')
        .attrs({
            'stroke-dasharray': function (d) {
                var path = d3.select(this),
                    totalLength = path.node().getTotalLength(),
                    marker = svg.select('#' + d['markerEnd']).nodes()[0],
                    markerWidth = marker.markerWidth.baseVal.value;
                return '' + (totalLength - markerWidth) + ' ' + markerWidth;
            },
            'stroke-dashoffset': 0
        });
}

function _createClasses(ctx, classes) {
    const d3 = ctx.d3;
    const svg = ctx.svg;
    var g = svg.selectAll('g.class')
        .data(classes).enter().append('g')
        .attrs({
            id: function (d) {
                return d.classname + 'Class';
            },
            'class': 'class',
            transform: function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            },
        });

    g.append('rect')
        .attrs({
            'width': function (d) {
                return d.width;
            },
            'fill': 'none',
            'stroke': 'black',
            'stroke-width': 1
        });

    var classNameG = g.append('g')
        .attrs({'class': 'classname'});
    var classNameRects = classNameG.append('rect')
        .attrs({
            'width': function (d) {
                return d.width;
            },
            'fill': 'none',
            'stroke': 'black',
            'stroke-width': 1
        });
    var classNameTexts = classNameG.append('text')
        .attrs({'font-size': 12})
        .call(d3.multilineText()
            .verticalAlign('top')
            .paddingTop(4)
            .paddingBottom(4)
            .text(function (d) {
                return d.classname;
            })
        );


    ClassDiagram._adjustHeight(ctx, classNameRects.nodes(), classNameTexts.nodes(), 4, 4);


    var attributesG = g.append('g')
        .attrs({
            'class': 'attributes',
            'transform': function (d) {
                var classNameG = d3.select(this).node().previousSibling,
                    height = classNameG.getBBox().height;
                return 'translate(0,' + height + ')';
            }
        });
    var attributesRects = attributesG.append('rect')
        .attrs({
            'width': function (d) {
                return d.width;
            },
            'fill': 'none',
            'stroke': 'black',
            'stroke-width': 1
        });
    var attributesTexts = attributesG.append('text')
        .attrs({'font-size': 12})
        .call(d3.multilineText()
            .text(function (d) {
                return d.attributes;
            })
            .verticalAlign('top')
            .horizontalAlign('left')
            .paddingTop(4)
            .paddingLeft(4)
        );
    ClassDiagram._adjustHeight(ctx, attributesRects.nodes(), attributesTexts.nodes(), 4, 4);

    var methodsG = g.append('g')
        .attrs({
            'class': 'methods',
            'transform': function (d) {
                var attributesG = d3.select(this).node().previousSibling,
                    classNameText = attributesG.previousSibling,
                    classNameBBox = classNameText.getBBox(),
                    attributesBBox = attributesG.getBBox();
                return 'translate(0,' + (classNameBBox.height + attributesBBox.height) + ')';
            }
        });
    var methodsRects = methodsG.append('rect')
        .attrs({
            'width': function (d) {
                return d.width;
            },
            'fill': 'none',
            'stroke': 'black',
            'stroke-width': 1
        });
    var methodsTexts = methodsG.append('text')
        .attrs({'font-size': 12})
        .call(d3.multilineText()
            .text(function (d) {
                return d.methods;
            })
            .verticalAlign('top')
            .horizontalAlign('left')
            .paddingTop(4)
            .paddingLeft(4)
        );
    ClassDiagram._adjustHeight(ctx, methodsRects.nodes(), methodsTexts.nodes(), 4, 4);

    svg.selectAll('g.class')
        .each(function (d, i) {
            var classG = d3.select(this),
                classRect = classG.node().firstChild,
                classNameG = classRect.nextSibling,
                attributesG = classNameG.nextSibling,
                methodsG = attributesG.nextSibling,
                height =
                    classNameG.getBBox().height +
                    attributesG.getBBox().height +
                    methodsG.getBBox().height;
            d3.select(classRect).attrs({'height': height});
        });

    var boxes = {};
    svg.selectAll('g.class')
        .each(function (d, i) {
            var classG = d3.select(this),
                bbox = classG.node().getBBox();
            boxes[d.classname] = new ClassDiagram.Box(d.x, d.y, bbox.width, bbox.height);
        });

    return boxes;

}

function _adjustHeight(ctx, rects, texts, paddingTop, paddingBottom) {
    const d3 = ctx.d3;
    var i, rect, text, height;
    for (i = 0; i < rects.length; i++) {
        rect = rects[i];
        text = texts[i];
        height = text.getBBox().height + paddingTop + paddingBottom;
        d3.select(rect).attrs({'height': height});
    }
}

function _addMarkers(defs) {
    console.log(defs);
    var a = defs.append('marker');
    console.log(a);
    var b = a.attrs({
        'id': 'filledTraiangle',
        viewBox: '0 0 10 10',
        'refX': 10,
        'refY': 5,
        'markerWidth': 10,
        'markerHeight': 10,
        'orient': 'auto'
    })
    console.log(b);
    b.append('path')
        .attrs({
            d: 'M10 5 0 0 0 10Z',
            'fill-rule': 'evenodd',
            stroke: 'none',
            fill: 'black'
        });

    defs.append('marker')
        .attrs({
            'id': 'triangle',
            viewBox: '0 0 10 10',
            'refX': 10,
            'refY': 5,
            'markerWidth': 10,
            'markerHeight': 10,
            'orient': 'auto'
        })
        .append('path')
        .attrs({
            d: 'M10 5 0 0 0 10 Z M8 5 1 8.4 1 1.6Z',
            'fill-rule': 'evenodd',
            stroke: 'none',
            fill: 'black'
        });

    defs.append('marker')
        .attrs({
            'id': 'arrowhead',
            viewBox: '0 0 10 10',
            'refX': 10,
            'refY': 5,
            'markerWidth': 10,
            'markerHeight': 10,
            'orient': 'auto'
        })
        .append('path')
        .attrs({
            d: 'M10 5 0 10 0 8.7 6.8 5.5 0 5.5 0 4.5 6.8 4.5 0 1.3 0 0Z',
            stroke: 'none',
            fill: 'black'
        });

    defs.append('marker')
        .attrs({
            id: 'diamond',
            viewBox: '0 0 16 10',
            refX: 16,
            refY: 5,
            markerWidth: 16,
            markerHeight: 10,
            orient: 'auto'
        })
        .append('path')
        .attrs({
            d: 'M-1 5 7.5 0 16 5 7.5 10Z M1.3 5 7.5 8.7 14 5 7.5 1.3Z',
            'fill-rule': 'evenodd',
            stroke: 'none',
            fill: 'black'
        });

    defs.append('marker')
        .attrs({
            id: 'filledDiamond',
            viewBox: '0 0 16 10',
            refX: 16,
            refY: 5,
            markerWidth: 16,
            markerHeight: 10,
            orient: 'auto'
        })
        .append('path')
        .attrs({
            d: 'M-1 5 7.5 0 16 5 7.5 10Z',
            stroke: 'none',
            fill: 'black'
        });
}

ClassDiagram._createConnectors = _createConnectors;
ClassDiagram._createClasses = _createClasses;
ClassDiagram._adjustHeight = _adjustHeight;
ClassDiagram._addMarkers = _addMarkers;


ClassDiagram.prototype.createConnectors = function (connectors) {
    ClassDiagram._createConnectors(this.ctx, connectors);

};
ClassDiagram.prototype.createClasses = function (classes) {
    ClassDiagram._createClasses(this.ctx, classes);
};
ClassDiagram.prototype.adjustHeight = function (rects, texts, paddingTop, paddingBottom) {
    ClassDiagram._adjustHeight(this.ctx, rects, texts, paddingTop, paddingBottom);
};
ClassDiagram.prototype.addMarkers = function (defs) {
    ClassDiagram._addMarkers(defs);
};

export {
    ClassDiagram,
    Context
}

