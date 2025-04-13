# React + TypeScript + Vite

## Before optimization (sort)

- Component CountriesList rendering duration - 3.3ms
- Context.Provider rendering duration - 1.1ms
- Components Card and Choose rendering from 0.1ms to 1.1ms
- Total rendering duration - 51.5ms

![before optimization flamegraph](./profiler/image.png)
![before optimization flamegraph CountriesList](./profiler/image-1.png)
![before optimization ranked](./profiler/image-2.png)

## After optimization (sort)

- Component CountriesList rendering duration - 3.4ms
- Context.Provider rendering duration - 0.6ms
- Components Card and Choose rendering from 0.1ms to 0.2ms
- Total rendering duration - 33.7ms

![after optimization flamegraph](./profiler/image-3.png)
![after optimization flamegraph CountriesList](./profiler/image-4.png)
![after optimization ranked](./profiler/image-5.png)

## Conclusion

Optimization reduced overall rendering time by **_14.4ms_** or **_~30%_**
