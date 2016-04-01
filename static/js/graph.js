queue().defer(d3.json,'/planetsList/planets').await(makeGraphs);


function makeGraphs(error, planetsJson) {

    function print_filter(filter){
        var f=eval(filter);
        if(typeof(f.length)!="undefined"){}else{}
        if(typeof(f.top)!="undefined"){f=f.top(Infinity);}else{}
        if(typeof(f.dimension)!="undefined"){f=f.dimension(function(d){return"";}).top(Infinity);}else{}
        console.log(filter+"("+f.length+")="+JSON.stringify(f).replace("[","[\n\t").replace(/},/g,"},\n\t").replace("]","\n]"));
    }
    var data=planetsJson;

    var basezone=[0.5,1,2,4,8,16,32,64,128,256];
    var minimumXY=[];
    var maximumXY=[];
    //var minimumY=[];
    //var maximumY=[];

    for (i=0; i<basezone.length; i++){
        var xmin=basezone[i]*0.88
        var ymin=Math.pow(xmin,2)
        minimumXY[i]=[xmin,ymin];


        var xmax=basezone[i]*1.6;
        var ymax=Math.pow(xmax,2);
        maximumXY[i]=[xmax,ymax];

    }





    var ndx = crossfilter(data);
    var ndx2=crossfilter(minimumXY);
    var ndx3=crossfilter(maximumXY);

    var minxdim=ndx2.dimension(function(d){return d[0]});
    var minydim=ndx2.dimension(function(d){return d[1]});
    var minxgroup= minxdim.group();
    var minygroup=minydim.group();

    var maxxdim=ndx3.dimension(function(d){return d[0]});
    var maxydim=ndx3.dimension(function(d){return d[1]});
    var maxxgroup= maxxdim.group();
    var maxygroup=maxydim.group();

    var starDim = ndx.dimension(function(d) { return d["STAR"]; });
    var planetsByStar=starDim.group();

    var missionDim =ndx.dimension(function(d){return d["MISSION"]});
    var planetsByMission=missionDim.group();


    var dateDim = ndx.dimension(function(d) { return d["DATE"]});
    var planetsByDate=dateDim.group();


    var methodDim=ndx.dimension(function(d){return d["PLANETDISCMETH"]});
    var planetsByMethod=methodDim.group();

    var distanceDim=ndx.dimension(function(d){return d["SEP"]});
    var planetsBydistance=distanceDim.group();

    var densityDim=ndx.dimension(function(d){return d["DENSITY"]});
    var planetsByDensity=densityDim.group();

    var starLuminosity=ndx.dimension(function(d){return d["LUMINOSITY"]});
    var starbyLuminosity=starLuminosity.group();

    var radiusDim=ndx.dimension(function(d){return d["R"]});
    var planetsByRadius=radiusDim.group();



    var all=ndx.groupAll();

    var minDistance=distanceDim.bottom(1)[0];
    var maxDistance=distanceDim.top(1)[0];
    var minDensity=densityDim.bottom(1)[0];
    var maxDensity=densityDim.top(1)[0];
    var minLuminosity=starLuminosity.bottom(1)[0];
    var maxLuminosity=starLuminosity.top(1)[0];
    var minRadius=radiusDim.bottom(1)[0];
    var maxRadius=radiusDim.top(1)[0];

    //var DensityChart = dc.bubbleChart('#group');
    var missionChart=dc.rowChart('#mission');
    var methodChart =dc.pieChart('#method');
    var yearChart=dc.rowChart('#year');
    var NumberPlanetsND = dc.numberDisplay("#NumberPlanets");


   //DensityChart.width(1200).height(400)
   //    .margins({top: 10, right: 50, bottom: 30, left: 30})
   //    .dimension(planetsBydistance)
   //    .group(starbyLuminosity)
   //    .colors(['red', 'green', 'blue'])
   //    .colorDomain([minDensity, maxDensity])
   //    .colorAccessor(function (d){return d["DENSITY"]})
   //    .keyAccessor(function(d){return d["DISTANCE"]})
   //    .valueAccessor(function(d){return d["LUMINOSITY"]})
   //    .radiusValueAccessor(function(d){return d["R"]})
   //    .x(d3.scale.linear().domain[minDistance, maxDistance])
   //    .y(d3.scale.linear().domain[minLuminosity, maxLuminosity])
   //    .r(d3.scale.linear().domain[minRadius, maxRadius])
   //    .elasticX(true)
   //    .elasticY(true)
   //    //.xAxisLabel('Distance Star to Planet in Au')
   //    //.yAxisLabel('Luminosity of Start Relative to Sun');

    missionChart.width(400).height(400)
        .dimension(missionDim)
        .group(planetsByMission)
        .elasticX(true)
        .xAxis().ticks(4)
        //.xAxisLabel("Number of Stars Discovered")
        //.yAxisLabel("Mission");


    yearChart.width(400).height(400)
        .dimension(dateDim)
        .group(planetsByDate)
        .elasticX(true)
        .xAxis().ticks(4)
        //.xAxisLabel("Number of Stars Discovered")
        //.yAxisLabel("Year Discovered");


    methodChart.height(400)
        .radius(125)
        .innerRadius(100)
        .dimension(methodDim)
        .group(planetsByMethod);


    selectField=dc.selectMenu('#menu-select-star')
        .dimension(starDim)
        .group(planetsByStar);

    selectField=dc.selectMenu('#menu-select-year')
        .dimension(dateDim)
        .group(planetsByDate);


    NumberPlanetsND
        .formatNumber(d3.format('d'))
        .valueAccessor(function (d) {
            return d;
        })
        .group(all);

    console.log("done");
    //
    //
    //
    dc.renderAll();

}

