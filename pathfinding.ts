
function dijkstra(graph: Knot[], start: Knot, goal: Knot) {
    var visited = new Map<Knot, boolean>()
    var openlist = [start]
    for (var knot of graph) {
        knot.cost = Number.POSITIVE_INFINITY
        knot.crumb = null
    }
    start.cost = 0


    while (openlist.length > 0) {

        var current = openlist.splice(findbestIndex(openlist, (knot) => -knot.cost), 1)[0]
        visited.set(current, true)

        for (var edge of current.neighbours) {
            var neighbour = edge.destination
            if (visited.has(neighbour)) {
                continue
            }

            openlist.push(neighbour)
            var newcost = current.cost + edge.weight
            if (newcost < neighbour.cost) {
                neighbour.cost = newcost
                neighbour.crumb = current
            }

        }

    }
}

function backtrace(end: Knot, start: Knot) {
    var current = end;
    var answer = [end]

    while (current != end) {
        current = current.crumb
        answer.push(current)
    }
    return answer
}



class Knot {
    crumb: Knot = null
    cost: number = 0
    neighbours: Edge[] = []
}

class Edge {
    weight: number
    destination: Knot

    constructor(weight: number, destination: Knot) {
        this.weight = weight
        this.destination = destination
    }
}