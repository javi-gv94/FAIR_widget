var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1);

var y = d3.scaleLinear()
    .range([height, 0]);



var svg = d3.select("body").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  let xAxis = d3.axisBottom(x)
yAxis = d3.axisLeft(y);

// Load the sequencelogo font defs...
sequencelogoFont();

var data = 
	[ // root array


		  [ {letter:"F", bits: 1.9}],
		  [ {letter:"A", bits: 0.4}],
		  [ {letter:"I", bits: 1.4}],
		  [ {letter:"R", bits: 0.9}],
	];

data.forEach(function(d) {
	var y0 = 0;
	d.bits = d.map( function( entry ) { 
				
		return { bits: entry.bits, letter: entry.letter, y0: y0, y1 : y0 += +entry.bits };  		
	    }  
	)
	d.bitTotal = d.bits[d.bits.length - 1].y1; 
});

x.domain( data.map( function(d,i) { return i; } ) );

var maxBits = d3.max( data, function( d ) { return d.bitTotal } );

y.domain([0, maxBits]);

svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);

svg.append("g")
  .attr("class", "y axis")
  .call(yAxis)
.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .text("Bits");

var column = svg.selectAll(".sequence-column")
  .data(data)
	.enter()
	.append("g")
	.attr("transform", function(d, i) { return "translate(" + (x(i) + (x.bandwidth() / 2)) + ",0)"; })
	.attr("class", "sequence-column");

var capHeightAdjust  = 0.99, // approximation to bring cap-height to full font size
	logoYAdjust      = 0.053;


column
	.selectAll("text")
	.data( function(d) { return d.bits; })
	.enter()
	.append("text")
		.attr("y", function(e) { return y(e.y0) - (y(e.y0) - y(e.y1))*logoYAdjust ; })
		.text( function(e) { return e.letter; } )
		.attr("class", function(e) { return "letter-" + e.letter; } )
		.style( "text-anchor", "middle" )
		.style( "font-family", "sequencelogo" )
		.attr( "textLength", x.bandwidth())
		.attr( "lengthAdjust", "spacingAndGlyphs" )
		.attr( "font-size", function(e) { return ( y(e.y0) - y(e.y1) ) * capHeightAdjust; } )
		.style( "font-size", function(e) { return ( y(e.y0) - y(e.y1) ) * capHeightAdjust; } )


function sequencelogoFont(){
var font = svg.append("defs").append("font")
															 	.attr("id","sequencelogo") 
																.attr("horiz-adv-x","1000")
																.attr("vert-adv-y","1000")

font.append("font-face")
			.attr("font-family","sequencelogo") 
			.attr("units-per-em","1000") 
			.attr("ascent","950") 
			.attr("descent","-50")

font.append("glyph")
			.attr("unicode","A") 
			.attr("vert-adv-y","50") 
			.attr("d","M500 767l-120 -409h240zM345 948h310l345 -1000h-253l-79 247h-338l-77 -247h-253l345 1000v0z") 

font.append("glyph")
			.attr("unicode","I") 
			.attr("vert-adv-y","50") 
			.attr("d","m -1.3301059e-5,773.49201 0,174.1456 1000.000003301059,0 0,-174.1456 -334.0831,0 0,-651.7088 334.0831,0 0,-174.14561 -1000.000003301059,0 0,174.14561 334.083103301059,0 0,651.7088 -334.083103301059,0") 

font.append("glyph")
			.attr("unicode","F") 
			.attr("vert-adv-y","50") 
			.attr("d","m 999.99999,773.49201 -682.7959,0 0,-215.674 621.5058,0 0,-174.1457 -621.5058,0 0,-436.03471 -317.204104951589,0 0,1000.00001 1000.000004951589,0 0,-174.1456") 

font.append("glyph")
			.attr("unicode","R") 
			.attr("vert-adv-y","50") 
			.attr("d","m 612.72783,419.84141 c 26.66536,-4.02 49.695,-13.3963 69.09022,-28.132 19.99902,-14.2889 44.24142,-42.42 72.72722,-84.3932 l 245.4547,-359.67861 -294.5459,0 -163.6356,252.51181 c -4.84978,7.1435 -11.21357,16.9676 -19.09139,29.4704 -47.87972,75.4635 -104.24235,113.1948 -169.09047,113.1948 l -85.45481,0 0,-395.17701 -268.1817983010593,0 0,1000.00001 387.2734383010593,0 c 174.54404,-9e-4 299.69564,-22.7736 375.45348,-68.3191 76.36294,-45.5464 114.54441,-119.6696 114.5457,-222.3707 -10e-4,-68.7659 -22.72839,-123.4657 -68.18129,-164.0996 -45.45548,-40.6338 -110.90998,-64.9698 -196.3635,-73.0068 m -344.54603,361.6876 0,-272.6058 126.36436,0 c 73.33231,0 125.75668,10.4929 157.27181,31.4804 32.12022,21.4334 48.18098,56.485 48.18227,105.1578 -10e-4,48.6709 -15.75821,83.4997 -47.27334,104.4872 -31.51513,20.9866 -84.24204,31.4795 -158.18074,31.4804 l -126.36436,0")
										
};
