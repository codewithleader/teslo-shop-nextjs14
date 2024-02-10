export const generatePaginationNumbers = (
  currentPage: number,
  totalPages: number,
) => {
  // Si el número total de páginas es 7 o menos vamos a mostrar todas las páginas sin puntos suspensivos (...)
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1); // [1,2,3,4,5,6,7]
  }
  // Si la currentPage está entre las primeras 3 páginas, mostrar las primeras 3, puntos suspensivos, las ultimas 2.
  if (currentPage <= 3) {
    return [1, 2, 3, 4, '...', totalPages - 1, totalPages]; // [1,2,3,4,'...',49,50]
  }
  // Si la currentPage está entre las últimas 3 páginas, mostrár las primeras 2, puntos suspensivos, las últimas tres.
  if (currentPage >= totalPages - 2) {
    return [
      1,
      2,
      '...',
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ]; // [1,2,'...',47,48,49,50]
  }
  // Si la currentPage está en otro lugar medio, mostrar la primera página, puntos suspensivos, la página actual y vecinos
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
