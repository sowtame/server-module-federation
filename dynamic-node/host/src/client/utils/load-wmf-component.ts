export const loadWmfComponent = async (scope: string, module: string) => {
    // Эта строчка инициализирует область общего доступа.
    await __webpack_init_sharing__('default');
    const container = window[scope];

    // Инициализируем контейнер, он может предоставлять общие модули
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await container.init(__webpack_share_scopes__.default);

    // Загружаем нужные чанки.
    const factory = await window[scope].get(module);
    const Module = factory();

    return Module;
};
