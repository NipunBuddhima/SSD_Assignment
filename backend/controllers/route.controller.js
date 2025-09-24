import RouteService from "../services/route.service.js";

let RouteController = {};

/////////////////////////////////////// Add a route ////////////////////////////////////////////////

RouteController.addRoute = async (req, res) => {

    try {
        const {
            routeName,
            fBranchId,
            sBranchId
        } = req.body;

        let routeExist = await RouteService.checkRouteExistStatus(fBranchId, sBranchId);

        if (!routeExist) {
            await RouteService.addRoute(
                routeName,
                fBranchId,
                sBranchId
            );

            res.status(201).send({ message: "Route added successfully" });
        }
        else {
            res.status(422).send({ message: "Route already Exists!" })
        }
    } catch (e) {
        console.error(e);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

/////////////////////////////////////// Get all routes ////////////////////////////////////////////////

RouteController.getAllRoutes = async (req, res) => {
    try {
        let data = await RouteService.getAllRoutes();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ error: "Internal Server Error" });
    }
}

/////////////////////////////////////// Get all routes for table ////////////////////////////////////////////////

RouteController.getAllRoutesForTable = async (req, res) => {
    try {
        let data = await RouteService.getAllRoutesForTable();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ error: "Internal Server Error" });
    }
}

/////////////////////////////////////// Update route ////////////////////////////////////////////////

RouteController.updateRoute = async (req, res) => {
    try {
        const {
            routeId,
            routeName,
            firstBranchId,
            secondBranchId
        } = req.body;

        await RouteService.updateRoute(
            routeId,
            routeName,
            firstBranchId,
            secondBranchId
        );

        res.status(200).send({ message: "Route updated successfully" });
    } catch (e) {
        console.error(e);
        res.status(500).send({ error: "Internal Server Error" });
    }
}

/////////////////////////////////////// Delete route ////////////////////////////////////////////////

RouteController.deleteRoute = async (req, res) => {
    try {
        const routeId = req.params.routeId;

        await RouteService.deleteRoute(routeId);

        res.status(200).send({ message: "Route deleted successfully" });
    } catch (e) {
        console.error(e);
        res.status(500).send({ error: "Internal Server Error" });
    }
}

/////////////////////////////////////// Get branches by transport agent NIC ////////////////////////////////////////////////

RouteController.getBranchesByTransportAgentNic = async (req, res) => {
    try {
        const nic = req.params.nic;
        let data = await RouteService.getBranchesByTransportAgentNic(nic);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ error: "Internal Server Error" });
    }
}

export default RouteController;