// controllers/cartelera.controller.js
const { sql, poolPromise } = require('../dbConfig');

exports.getAll = async (_req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT imdbID, Title, [Year], [Type], Poster, Estado, [description], Ubication
      FROM dbo.cartelera2255
      ORDER BY fechaRegistro DESC
    `);
    res.json(result.recordset);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.insertOne = async (req, res) => {
  const { imdbID, Title, Year, Type, Poster, Estado, description, Ubication } = req.query;
  if (!imdbID || !Title || !Year || !Type || typeof Estado === 'undefined') {
    return res.status(400).json({ codError: '400', msgRespuesta: 'Parámetros requeridos faltantes' });
  }
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('imdbID', sql.VarChar(20), imdbID)
      .input('Title', sql.NVarChar(150), Title)
      .input('Year', sql.NVarChar(10), Year)
      .input('Type', sql.NVarChar(60), Type)
      .input('Poster', sql.NVarChar(300), Poster || null)
      .input('Estado', sql.Bit, (Estado === 'true' || Estado === true || Estado === '1') ? 1 : 0)
      .input('description', sql.NVarChar(sql.MAX), description || null)
      .input('Ubication', sql.NVarChar(120), Ubication || null)
      .query(`
        INSERT INTO dbo.cartelera2255
          (imdbID, Title, [Year], [Type], Poster, Estado, [description], Ubication)
        VALUES (@imdbID, @Title, @Year, @Type, @Poster, @Estado, @description, @Ubication)
      `);
    res.json({ codError: '200', msgRespuesta: 'Registro Insertado' });
  } catch (e) {
    if (e.number === 2627 || e.number === 2601) {
      return res.status(400).json({ codError: '400', msgRespuesta: 'imdbID duplicado' });
    }
    res.status(500).json({ codError: '500', msgRespuesta: e.message });
  }
};

exports.updateOne = async (req, res) => {
  const { imdbID, Title, Year, Type, Poster, Estado, description, Ubication } = req.query;
  if (!imdbID) return res.status(400).json({ codError: '400', msgRespuesta: 'imdbID requerido' });
  try {
    const pool = await poolPromise;
    const r = await pool.request()
      .input('imdbID', sql.VarChar(20), imdbID)
      .input('Title', sql.NVarChar(150), Title)
      .input('Year', sql.NVarChar(10), Year)
      .input('Type', sql.NVarChar(60), Type)
      .input('Poster', sql.NVarChar(300), Poster || null)
      .input('Estado', sql.Bit, (Estado === 'true' || Estado === true || Estado === '1') ? 1 : 0)
      .input('description', sql.NVarChar(sql.MAX), description || null)
      .input('Ubication', sql.NVarChar(120), Ubication || null)
      .query(`
        UPDATE dbo.cartelera2255
        SET Title=@Title, [Year]=@Year, [Type]=@Type, Poster=@Poster,
            Estado=@Estado, [description]=@description, Ubication=@Ubication
        WHERE imdbID=@imdbID
      `);
    if (r.rowsAffected[0] === 0) {
      return res.status(404).json({ codError: '404', msgRespuesta: 'Registro no encontrado' });
    }
    res.json({ codError: '200', msgRespuesta: 'Registro Actualizado' });
  } catch (e) {
    res.status(500).json({ codError: '500', msgRespuesta: e.message });
  }
};
