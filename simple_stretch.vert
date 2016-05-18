
out vec2 vVertex;

void main()
{
	vVertex = aVertex.xy;
	gl_Position = uModelViewProjectionMatrix * aVertex;
}