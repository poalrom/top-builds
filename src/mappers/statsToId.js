export default function (stats) {
    return stats.map(stat => stat.title).join("+");
}