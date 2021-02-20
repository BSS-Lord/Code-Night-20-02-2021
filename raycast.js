function rayCast (vec, list, depth) {

    const V = vec.norm();

    let dist = NaN;
    let point = null;
    
    list.forEach(obj => {
        const [_point, _dist] = obj.calc(V);

        if(dist.toString() == "NaN" || _dist < dist) {
            dist = _dist;
            point = _point;
        }
    });

    if(point.z < 0) {
        point.z = depth;
    }
    if(point.z > depth) {
        point.z = depth;
    }

    return point == null ? depth : point.z;

}

module.exports = rayCast;