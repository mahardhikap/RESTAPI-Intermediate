//fungsi untuk menghasilkan respon sukses
const successResponse = (data, status) => {
    return {
      success: true,
      data: data,
      status: status || 'berhasil'
    }
  }
  
//Fungsi untuk menghasilkan respon kesalahan
const errorResponse = (message, statusCode) => {
    return {
      success: false,
      error: {
        message: message || 'terdapat error',
        statusCode: statusCode
    }
  }
}

module.exports = {
    successResponse,
    errorResponse
}