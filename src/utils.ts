export const shuffleArray = (array: any[]) => {
    return [...array].sort(() => {
        return Math.random() - 0.5;
    });
}