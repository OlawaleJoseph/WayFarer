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
  static async findATrip(req, res) {
    try {
      const { trip_completed, ...foundTrip } = await tripHelperfunction.findTrip(req.params.tripId);
      return res.status(200).json({
        status: 'success',
        data: foundTrip,
      });
    } catch (error) {
      return res.status(404).json({
        status: 'error',
        message: error.message,
      });
    }
  }
}
export default Trips;
