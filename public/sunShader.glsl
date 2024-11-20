
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;
uniform vec2 mouse_position;
uniform float time;
uniform vec3 vPosition;
uniform sampler2D u_texture;

varying vec2 vUv;
// 2D Random
float random (in vec3 st) {
    return fract(sin(dot(st,vec3(12.9898,78.233,23.112)))*12943.145);
}
float noise (in vec3 _pos) {
    vec3 i_pos = floor(_pos);
    vec3 f_pos = fract(_pos);

    float i_time = floor(time*0.2);
    float f_time = fract(time*0.2);

    // Four corners in 2D of a tile
    float aa = random(i_pos + i_time);
    float ab = random(i_pos + i_time + vec3(1., 0., 0.));
    float ac = random(i_pos + i_time + vec3(0., 1., 0.));
    float ad = random(i_pos + i_time + vec3(1., 1., 0.));
    float ae = random(i_pos + i_time + vec3(0., 0., 1.));
    float af = random(i_pos + i_time + vec3(1., 0., 1.));
    float ag = random(i_pos + i_time + vec3(0., 1., 1.));
    float ah = random(i_pos + i_time + vec3(1., 1., 1.));

    float ba = random(i_pos + (i_time + 1.));
    float bb = random(i_pos + (i_time + 1.) + vec3(1., 0., 0.));
    float bc = random(i_pos + (i_time + 1.) + vec3(0., 1., 0.));
    float bd = random(i_pos + (i_time + 1.) + vec3(1., 1., 0.));
    float be = random(i_pos + (i_time + 1.) + vec3(0., 0., 1.));
    float bf = random(i_pos + (i_time + 1.) + vec3(1., 0., 1.));
    float bg = random(i_pos + (i_time + 1.) + vec3(0., 1., 1.));
    float bh = random(i_pos + (i_time + 1.) + vec3(1., 1., 1.));

    // Smooth step
    vec3 t = smoothstep(0., 1., f_pos);
    float t_time = smoothstep(0., 1., f_time);

    // Mix 4 corners percentages
    return
    mix(
        mix(
            mix(mix(aa,ab,t.x), mix(ac,ad,t.x), t.y),
            mix(mix(ae,af,t.x), mix(ag,ah,t.x), t.y),
            t.z),
        mix(
            mix(mix(ba,bb,t.x), mix(bc,bd,t.x), t.y),
            mix(mix(be,bf,t.x), mix(bg,bh,t.x), t.y),
            t.z),
        t_time);
}


#define NUM_OCTAVES 6
float fBm ( in vec3 _pos, in float sz) {
    float v = 0.0;
    float a = 0.2;
    _pos *= sz;

    vec3 angle = vec3(-0.001*time,0.0001*time,0.0004*time);
    mat3 rotx = mat3(1, 0, 0,
    0, cos(angle.x), -sin(angle.x),
    0, sin(angle.x), cos(angle.x));
    mat3 roty = mat3(cos(angle.y), 0, sin(angle.y),
    0, 1, 0,
    -sin(angle.y), 0, cos(angle.y));
    mat3 rotz = mat3(cos(angle.z), -sin(angle.z), 0,
    sin(angle.z), cos(angle.z), 0,
    0, 0, 1);

    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(_pos);
        _pos = rotx * roty * rotz * _pos * 2.0;
        a *= 0.8;
    }
    return v;
}

void main() {
    vec3 st = gl_FragCoord.xyz*1.0/3080.0;

    vec3 q = vec3(0.);
    q.x = fBm(st, 5.);
    q.y = fBm(st + vec3(1.2, 3.2, 1.52), 5.);
    q.z = fBm(st + vec3(0.02, 0.12, 0.152), 5.);

    float n = fBm(st + q + vec3(1.82, 1.32, 1.09), 5.);

    vec3 color = vec3(0.);
    color = mix(vec3(1., 0.4, 0.), vec3(1., 1., 1.), n * n);
    color = mix(color, vec3(1., 0., 0.), q * 0.7);
    vec4 text_color = texture2D(u_texture, vUv);
    vec4 final_color = vec4(1.6 * color, 1.);
    gl_FragColor = mix(text_color, final_color, 0.8);
}