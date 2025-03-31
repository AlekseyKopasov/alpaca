export const createElement = (template: string): ChildNode => {
  const newElement = document.createElement('div');

  newElement.innerHTML = template;

  return newElement.firstChild! ?? false;
};

export const renderElement = (container: HTMLElement, component: ChildNode, place = 'beforeend') => {
  switch (place) {
    case 'prepend':
      container.prepend(component);
      break;
    case 'afterend':
      container.after(component);
      break;
    case 'beforeend':
      container.append(component);
      break;
  }
};
