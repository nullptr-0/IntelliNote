<template>
    <div class="not-found">
        <img src="../assets/404img.jpg" alt="404 Error Image" class="error-image">
        <h1>404 Not Found</h1>
        <p>Oops! It looks like the page you're trying to access doesn't exist.</p>
        <RouterLink to="/" class="btn-home">Go to Home</RouterLink>
    </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style scoped>
    .not-found {
        text-align: center;
    }

    .error-image {
        max-width: 300px;
        margin-bottom: 30px;
    }

    .not-found h1 {
        font-size: 48px;
        color: #333;
    }

    .not-found p {
        font-size: 18px;
        color: #666;
        margin-bottom: 20px;
    }

    .btn-home {
        display: inline-block;
        padding: 12px 24px;
        background-color: #007bff;
        color: #fff;
        border-radius: 5px;
        text-decoration: none;
        transition: background-color 1s ease;
    }

        .btn-home:hover {
            background-color: #0056b3;
        }
</style>
