class Vector3 {

    constructor (x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z; 
    }

    div (n) {

        const v = new Vector3(this.x, this.y, this.z);

        if(n instanceof Vector3) {
            v.x /= n.x;
            v.y /= n.y;
            v.z /= n.z;
        }
        else if(typeof n == "number") {
            v.x /= n;
            v.y /= n;
            v.z /= n;
        }
        else {
            throw "FUCK YOU! You're fucken idiot you put the string value in this function! You are the stupidest person i've ever seen.";
        }
        return v;

    }

    mult (n) {

        const v = new Vector3(this.x, this.y, this.z);

        if(n instanceof Vector3) {
            v.x *= n.x;
            v.y *= n.y;
            v.z *= n.z;
        }
        else if(typeof n == "number") {
            v.x *= n;
            v.y *= n;
            v.z *= n;
        }
        else {
            throw "FUCK YOU! You're fucken idiot you put the string value in this function! You are the stupidest person i've ever seen.";
        }
        return v;
    }

    add (n) {

        const v = new Vector3(this.x, this.y, this.z);

        if(n instanceof Vector3) {
            v.x += n.x;
            v.y += n.y;
            v.z += n.z;
        }
        else if(typeof n == "number") {
            v.x += n;
            v.y += n;
            v.z += n;
        }
        else {
            throw "FUCK YOU! You're fucken idiot you put the string value in this function! You are the stupidest person i've ever seen.";
        }
        return v;
    }

    sub (n) {

        const v = new Vector3(this.x, this.y, this.z);

        if(n instanceof Vector3) {
            v.x -= n.x;
            v.y -= n.y;
            v.z -= n.z;
        }
        else if(typeof n == "number") {
            v.x -= n;
            v.y -= n;
            v.z -= n;
        }
        else {
            throw "FUCK YOU! You're fucken idiot you put the string value in this function! You are the stupidest person i've ever seen.";
        }
        return v;
    }

    abs () {
        return new Vector3(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z));
    }

    get len () {
        return Math.sqrt( this.x**2 + this.y**2 + this.z**2 );
    }

    norm () {

        return this.div(this.len);

    }

    dot (vec) {
        
        return this.x*vec.x + this.y*vec.y + this.z*vec.z;

    }

    angleX () {

        const axisX = new Vector3(1, 0, 0);
        const axisY = new Vector3(0, 1, 0);
        const axisZ = new Vector3(0, 0, 1);

        const projXY = new Vector3(this.x, this.y, 0);
        const projXZ = new Vector3(this.x, 0, this.z);
        const projYZ = new Vector3(0, this.y, this.z);

        const angleX = Math.acos(projYZ.dot(axisZ))*Math.abs(this.y)/this.y;

        return angleX;

    }

    angleY () {

        const axisX = new Vector3(1, 0, 0);
        const axisY = new Vector3(0, 1, 0);
        const axisZ = new Vector3(0, 0, 1);

        const projXY = new Vector3(this.x, this.y, 0);
        const projXZ = new Vector3(this.x, 0, this.z);
        const projYZ = new Vector3(0, this.y, this.z);

        const angleY = Math.acos(projXZ.dot(axisZ))*Math.abs(this.x)/this.x;

        return angleY;

    }

    angleZ () {

        const axisX = new Vector3(1, 0, 0);
        const axisY = new Vector3(0, 1, 0);
        const axisZ = new Vector3(0, 0, 1);

        const projXY = new Vector3(this.x, this.y, 0);
        const projXZ = new Vector3(this.x, 0, this.z);
        const projYZ = new Vector3(0, this.y, this.z);

        const angleZ = Math.acos(projXY.dot(axisY))*Math.abs(this.x)/this.x;

        return angleZ;

    }

    proj (vec) {

        return vec.mult(this.dot(vec)/(vec.len**2));

    }

    scalProj (vec) {

        return this.dot(vec)/vec.len;

    }

    nearTo (vec, n) {

        const len = this.norm().sub(vec.norm()).abs().len;

        return len <= n;

    }

}

module.exports = Vector3;