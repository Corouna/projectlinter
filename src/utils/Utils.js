import Jenkins from 'jenkins';
import _ from 'lodash';

export const JenkinsObj = Jenkins({ baseUrl : 'http://root:root@10.0.0.100:9090' }); 

export const processAsData = text => {
	let f = text.split("\n").map(x=>x.split("  ")),
  		g = f.flat().flat(),
  		h = g.filter(x => x.length > 0).map(x => x.trim()),
  		i = _.remove(h, n => Boolean(n));

	let cur = null, newA = {};
	i.forEach(x => {
    if(x[0] === "/") {
        cur = x;
        newA[cur] = [];
    } else {
      if(cur && newA[cur]) {
          newA[cur].push(x)
      }
    }
	});

	let newB = [], idx = 1;
	for(let k in newA) {
    newB.push({
      file: k,
      error:[],
      open: false,
      id: idx
    });
    let i,a,temparray,chunk = 4;
    
    for ( i = 0, a = newA[k].length; i < a; i+=chunk) {
      temparray = newA[k].slice(i,i+chunk);
      newB[newB.length-1].error.push(temparray);
    }

    newB[newB.length-1].error = newB[newB.length-1].error.map(x => ({
      line: x[0].split(":")[0],
      column: x[0].split(":")[1],
      type: x[3],
      description: x[2]
    }));

    idx++;
	}

	console.log("Your JSON Object: ", newB);
	return newB;
}