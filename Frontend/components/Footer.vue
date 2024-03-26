<template>
	<div class="footer footer-fixed-bottom pt-5 pb-5 text-white-50 text-center text-md-start">
		<div class="container">
			<div class="row">
					<div class="col-md-6 col-lg-4">
						<div class="info mb-5">
							<img src="../public/img/logo.jpg" alt="" class="mb-4">
							<p class="mb-5">
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex natus reiciendis libero necessitatibus, suscipit facilis iure velit sunt sed sint!
							</p>
							<div class="copyright">
									Created By <span>Lorem.</span>
									<div>&copy; 2024 - <span>Lorem, ipsum.</span></div>
							</div>
						</div>
					</div>
					<LinksSection :title='"Links"' :items="['Home', 'Our services', 'Testimonials', 'Support', 'Terms and Condition']" />
					<LinksSection :title='"About US"' :items="['Sign In', 'Register', 'About Us', 'Blog', 'Contact Us']" />

					<div class="col-md-6 col-lg-4">
					<div class="contact">
						<h5 class="text-light">Contact Us</h5>
						<p class="lh-lg mt-3 mb-5">Get in touch with us via mail phone.We are waiting for your call or message</p>
						<a class="btn rounded-pill main-btn w-100" href="#">travel@gmail.com</a>
						<ul class="d-flex mt-5 list-unstyled gap-3">
							<li>
								<a class="d-block text-light" href="#">
									<Icon name="ic:baseline-facebook"/>
								</a>
							</li>
							<li>
								<a class="d-block text-light" href="#">
									<Icon name="mdi:twitter"/>
								</a>
							</li>
							<li>
								<a class="d-block bk-red text-light" href="#">
									<Icon name="mdi:linkedin"/>
								</a>
							</li>
							<li>
								<a class="d-block text-light" href="#">
									<Icon name="bi:youtube"/>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
</script>

<style scoped>

.footer {
    background-color: #19283f;
}

.footer .copyright > span {
  color: #33d1cc;
}

.footer .copyright div span {
  color: #ffc400;
}

.info img {
    width: 20px;
    height: 20px;
}

.main-btn {
  background-color: #ff3150;
  color: white;
  padding: 0.5rem 1rem;
}

.main-btn:hover {
  color: #ffc400;
}

</style>