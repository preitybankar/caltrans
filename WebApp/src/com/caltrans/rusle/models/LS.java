package com.caltrans.rusle.models;

public class LS {
	private final float mSlope;
	private final int mSlopeLength;
	private final float mLSValue;

	public LS(float slope, int slopeLength, float lsValue) {
		mSlope = slope;
		mSlopeLength = slopeLength;
		mLSValue = lsValue;
	}

	public int getSlopeLength() {
		return mSlopeLength;
	}

	public float getSlope() {
		return mSlope;
	}

	public float getLSValue() {
		return mLSValue;
	}
	
	@Override
	public String toString() {
		return String.format("Slope: %f, Slope length: %d, LS value: %f", mSlope, mSlopeLength, mLSValue);
	}
}
