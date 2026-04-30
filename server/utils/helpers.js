export const isOverdue = (deadline) => {
  return new Date(deadline) < new Date();
};