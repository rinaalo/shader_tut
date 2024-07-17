precision highp float;

varying vec2 vTexCoord;
varying vec4 vVertexColor;

uniform float uTime;

void main() {
  vec3 colors = vec3(0.5);
  // give shape a color
  // colors.x += (sin(uTime * 1. + vTexCoord.x)) / 2.;
  // colors.y += (sin(uTime * 2. + vTexCoord.x)) / 2.;
  // colors.z += (sin(uTime * 3. + vTexCoord.x)) / 2.;

  colors += sin(uTime * vec3(1. , 2., 3.) + vTexCoord.x + cos(vTexCoord.y * uTime)) / 2.;

  gl_FragColor = vec4(colors, 1.0);
}