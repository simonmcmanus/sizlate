declare module 'sizlate'  {
  type Markup  = string | HTMLElement;
  type Values= {} | Values[] | string;
  type Selectors = Record<string, Values>
  function render(Markup, Selectors): string; 
  function classifyKeys({}, {}): string; 
}
