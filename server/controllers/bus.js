import helperFunction from '../utils/bus.utils';

class Bus {
  static async createBus(req, res) {
    try {
      const registeredBus = await helperFunction.findBusByPlate(req.body.number_plate);
      if (!registeredBus) {
        try {
          const newBus = await helperFunction.createBus(req.body);
          const { seats, ...newBusObj } = newBus;
          return res.status(201).json({
            status: 'success',
            data: newBusObj,
          });
        } catch (error) {
          return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
          });
        }
      } else {
        return res.status(409).json({
          status: 'error',
          message: 'Bus already registered',
        });
      }
    } catch (error) {
      return res.status(404).json({
        status: 'error',
        message: error.message,
      });
    }
  }
}

export default Bus;
