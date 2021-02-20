class Plane {
    
    constructor (normal, origin) {
        this.normal = normal.norm();
        this.origin = origin;
        this.type = "plane";
    }

    calc (V, depth) {

        const W = this.origin;
        const N = this.normal;

        let vdotn = V.dot(N);

        if(vdotn <= 0)
            vdotn = 0;

        const I = V.mult(W.dot(N)/vdotn);

        return [I, I.len];

    }

}

class Rectangle {

    constructor (a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = new Vector3();
        this.normal = this.getNormal();
        this.origin = this.getOrigin();
        this.plane = new Plane(this.normal, this.origin);
        this.type = "tirangle";
    }

    getNormal () {

        const V = this.b.sub(this.a);
        const W = this.c.sub(this.a);

        const Nx = (V.y*W.z)-(V.z*W.y);
        const Ny = (V.z*W.x)-(V.x*W.z);
        const Nz = (V.x*W.y)-(V.y*W.x);

        const N = new Vector3(Nx, Ny, Nz);

        return new Vector3(0, 0, 1);//N.mult(-1).norm();

    }

    getOrigin() {

        return new Vector3(0, 0, 5);//this.a.add(this.b).add(this.c).div(3);

    }

    calc (V, depth) {

        this.normal = this.getNormal();
        this.origin = this.getOrigin();
        this.plane = new Plane(this.normal, this.origin);
    
        const [I, _dist] = this.plane.calc(V);
    
        const AB = this.b.sub(this.a);
        const BC = this.c.sub(this.b);
        const CA = this.a.sub(this.c);
    
        const ABa = this.a.scalProj(AB);
        const ABi = I.scalProj(AB);
        const ABb = this.b.scalProj(AB);
    
        const BCb = this.b.scalProj(BC);
        const BCi = I.scalProj(BC);
        const BCc = this.c.scalProj(BC);
    
        const CAc = this.c.scalProj(CA);
        const CAi = I.scalProj(CA);
        const CAa = this.a.scalProj(CA);
    
        if(inInterval(ABi, ABa, ABb) && inInterval(BCi, BCb, BCc)) {
            return [I, _dist];
        }
        else {
            return [I.mult(Infinity), Infinity];
        }
    
    
    }

}

function inInterval (a, b, c) {

    return (a >= b && a <= c) || (a >= c && a <= b);

}


module.exports = {
    Plane: Plane,
    Rectangle: Rectangle
}