uniform sampler2D uTexUnit;
in vec2 vST;

void main()
{
	gl_FragColor = texture2D(uTexUnit, vST);
}