import tripHelperfunction from '../utils/trips.utils';

class Trips {
  static async createTrip(req, res) {
    try {
      const createdTrip = await tripHelperfunction.create(req.body);
      return res.status(201).json({
        status: 'success',
        data: createdTrip,
      });
    } catch (error) {
      return res.status(422).json({
        status: 'error',
        message: error.message,
      });
    }
  }
}
export default Trips;
