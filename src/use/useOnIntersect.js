/**
 * @function onIntersect
 * @param  {HTMLElement} elementToWatch elementToWatch
 * @param  {function} callback       callback once element is intersecting
 * @param  {Boolean} once           if callback only run one time
 * @param  {Object} options        Intersection Observer API options
 * @return {type} observer
 */

export const onIntersect = (
    elementToWatch,
    options = { threshold: 1.0 },
    callback,
    outCallback = () => {},
    once = true,
  ) => {
    // Initiate the observer
    const observer = new IntersectionObserver(([entry]) => {
      // If the element to watch is intersecting within the threshold
      if (entry && entry.isIntersecting) {
        // Run the callback
        callback(entry.target);
  
        // If the callback should only run once, unobserve the element
        if (once) {
          observer.unobserve(entry.target);
        }
      }
  
      // If the element is not intersecting, run the (optional) unintersecting callback
      else {
        outCallback(entry.target);
      }
    }, options);
  
    // Observe the element
    observer.observe(elementToWatch);
    // elementsToWatch.forEach((element) => {
    // })
  
    // Returns the observer so it can be further used in the component
    return observer;
  };