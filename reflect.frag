#version 330 compatibility

in vec3 vReflectVector;

uniform samplerCube uReflectUnit;

void main()
{
	gl_FragColor = textureCube(uReflectUnit, vReflectVector);
}