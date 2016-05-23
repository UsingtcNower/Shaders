uniform sampler2D tex0; 
uniform sampler2D tex1; 
in vec2 vST;

void main() 
{ 
	vec4 src = texture2D(tex0, vST); 
	gl_FragColor = vec4( texture2D(tex1, vec2(src.r, 0.0)).r, texture2D(tex1, vec2(src.g, 0.0)).g, texture2D(tex1, vec2(src.b, 0.0)).b, src.a); 
}